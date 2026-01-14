// CodeQuest - WebSocket Service for Real-time Duels
'use client';

import { io, Socket } from 'socket.io-client';

// Types
export interface DuelPlayer {
    id: string;
    name: string;
    image?: string;
    score: number;
    answeredCurrent: boolean;
    streak: number;
}

export interface DuelQuestion {
    id: string;
    text: string;
    code?: string;
    options: string[];
    timeLimit: number; // seconds
}

export interface DuelState {
    id: string;
    status: 'matchmaking' | 'waiting' | 'countdown' | 'question' | 'result' | 'finished';
    player1: DuelPlayer;
    player2: DuelPlayer;
    currentQuestion?: DuelQuestion;
    questionNumber: number;
    totalQuestions: number;
    correctAnswer?: number;
    timeRemaining?: number;
    winner?: string;
}

export interface DuelEvents {
    onStateChange: (state: DuelState) => void;
    onCountdown: (seconds: number) => void;
    onQuestionStart: (question: DuelQuestion, timeRemaining: number) => void;
    onOpponentAnswered: () => void;
    onQuestionResult: (correctAnswer: number, myAnswerCorrect: boolean) => void;
    onDuelEnd: (winner: string, finalState: DuelState) => void;
    onError: (error: string) => void;
    onDisconnect: () => void;
}

class DuelService {
    private socket: Socket | null = null;
    private currentDuelId: string | null = null;
    private events: Partial<DuelEvents> = {};

    // Connect to WebSocket server
    connect(serverUrl: string = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'): void {
        if (this.socket?.connected) return;

        this.socket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            timeout: 10000,
        });

        this.setupListeners();
    }

    private setupListeners(): void {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('[Duel] Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('[Duel] Disconnected from server');
            this.events.onDisconnect?.();
        });

        this.socket.on('duel:state', (state: DuelState) => {
            this.events.onStateChange?.(state);
        });

        this.socket.on('duel:countdown', (seconds: number) => {
            this.events.onCountdown?.(seconds);
        });

        this.socket.on('duel:question', (data: { question: DuelQuestion; timeRemaining: number }) => {
            this.events.onQuestionStart?.(data.question, data.timeRemaining);
        });

        this.socket.on('duel:opponentAnswered', () => {
            this.events.onOpponentAnswered?.();
        });

        this.socket.on('duel:result', (data: { correctAnswer: number; myAnswerCorrect: boolean }) => {
            this.events.onQuestionResult?.(data.correctAnswer, data.myAnswerCorrect);
        });

        this.socket.on('duel:end', (data: { winner: string; finalState: DuelState }) => {
            this.events.onDuelEnd?.(data.winner, data.finalState);
            this.currentDuelId = null;
        });

        this.socket.on('duel:error', (error: string) => {
            this.events.onError?.(error);
        });
    }

    // Set event handlers
    on<K extends keyof DuelEvents>(event: K, handler: DuelEvents[K]): void {
        this.events[event] = handler;
    }

    // Join matchmaking queue
    findMatch(userId: string, userName: string, userImage?: string): void {
        if (!this.socket?.connected) {
            this.connect();
            setTimeout(() => this.findMatch(userId, userName, userImage), 1000);
            return;
        }

        this.socket.emit('duel:findMatch', { userId, userName, userImage });
    }

    // Cancel matchmaking
    cancelMatchmaking(): void {
        this.socket?.emit('duel:cancelMatchmaking');
    }

    // Challenge specific friend
    challengeFriend(friendId: string, userId: string, userName: string): void {
        if (!this.socket?.connected) {
            this.connect();
            setTimeout(() => this.challengeFriend(friendId, userId, userName), 1000);
            return;
        }

        this.socket.emit('duel:challenge', { friendId, userId, userName });
    }

    // Accept duel invitation
    acceptDuel(duelId: string): void {
        this.socket?.emit('duel:accept', { duelId });
        this.currentDuelId = duelId;
    }

    // Submit answer
    submitAnswer(answerIndex: number): void {
        if (!this.currentDuelId) return;
        this.socket?.emit('duel:answer', { duelId: this.currentDuelId, answerIndex });
    }

    // Leave duel (forfeit)
    leaveDuel(): void {
        if (!this.currentDuelId) return;
        this.socket?.emit('duel:leave', { duelId: this.currentDuelId });
        this.currentDuelId = null;
    }

    // Disconnect
    disconnect(): void {
        this.socket?.disconnect();
        this.socket = null;
        this.currentDuelId = null;
    }

    // Get connection status
    isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

// Singleton instance
export const duelService = new DuelService();

// Mock duel for development (simulates WebSocket behavior)
export function createMockDuel(
    onStateChange: (state: DuelState) => void
): { start: () => void; answer: (index: number) => void; stop: () => void } {
    let questionIndex = 0;
    let timer: NodeJS.Timeout | null = null;
    let isRunning = false;

    const mockQuestions: DuelQuestion[] = [
        {
            id: '1',
            text: 'Qual tag é usada para criar um parágrafo em HTML?',
            options: ['<p>', '<paragraph>', '<text>', '<para>'],
            timeLimit: 10,
        },
        {
            id: '2',
            text: 'Qual atributo define a URL de um link?',
            options: ['src', 'href', 'url', 'link'],
            timeLimit: 10,
        },
        {
            id: '3',
            text: 'Como criar um campo de texto em um formulário?',
            code: '<form>\n  <!-- Qual opção? -->\n</form>',
            options: ['<input type="text">', '<text>', '<textfield>', '<input text>'],
            timeLimit: 10,
        },
    ];

    const correctAnswers = [0, 1, 0];

    const initialState: DuelState = {
        id: 'mock-duel',
        status: 'waiting',
        player1: { id: 'me', name: 'Você', score: 0, answeredCurrent: false, streak: 0 },
        player2: { id: 'bot', name: 'Bot HTML', score: 0, answeredCurrent: false, streak: 0 },
        questionNumber: 0,
        totalQuestions: mockQuestions.length,
    };

    let state = { ...initialState };

    function updateState(partial: Partial<DuelState>) {
        state = { ...state, ...partial };
        onStateChange(state);
    }

    function nextQuestion() {
        if (questionIndex >= mockQuestions.length) {
            const winner = state.player1.score > state.player2.score ? 'me' : 'bot';
            updateState({ status: 'finished', winner });
            isRunning = false;
            return;
        }

        // Fix: correctly define question BEFORE usage and updateState
        const question = mockQuestions[questionIndex];
        if (!question) return;

        updateState({
            status: 'question',
            currentQuestion: question,
            questionNumber: questionIndex + 1,
            timeRemaining: question.timeLimit,
            player1: { ...state.player1, answeredCurrent: false },
            player2: { ...state.player2, answeredCurrent: false },
        });

        // Simulate opponent answering after 2-6 seconds
        const opponentDelay = 2000 + Math.random() * 4000;
        setTimeout(() => {
            if (!isRunning) return;
            const opponentCorrect = Math.random() > 0.3;
            updateState({
                player2: {
                    ...state.player2,
                    answeredCurrent: true,
                    score: opponentCorrect ? state.player2.score + 100 : state.player2.score,
                    streak: opponentCorrect ? state.player2.streak + 1 : 0,
                },
            });
        }, opponentDelay);

        // Timer countdown
        let remaining = question.timeLimit;
        timer = setInterval(() => {
            remaining--;
            updateState({ timeRemaining: remaining });
            if (remaining <= 0) {
                if (timer) clearInterval(timer);
                showResult();
            }
        }, 1000);
    }

    function showResult() {
        if (timer) clearInterval(timer);
        updateState({
            status: 'result',
            correctAnswer: correctAnswers[questionIndex],
        });

        setTimeout(() => {
            questionIndex++;
            nextQuestion();
        }, 2000);
    }

    return {
        start: () => {
            isRunning = true;
            questionIndex = 0;
            state = { ...initialState };
            updateState({ status: 'countdown' });

            let countdown = 3;
            const countdownTimer = setInterval(() => {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(countdownTimer);
                    nextQuestion();
                }
            }, 1000);
        },
        answer: (index: number) => {
            if (state.player1.answeredCurrent) return;

            const isCorrect = index === correctAnswers[questionIndex];
            updateState({
                player1: {
                    ...state.player1,
                    answeredCurrent: true,
                    score: isCorrect ? state.player1.score + 100 : state.player1.score,
                    streak: isCorrect ? state.player1.streak + 1 : 0,
                },
            });
        },
        stop: () => {
            isRunning = false;
            if (timer) clearInterval(timer);
        },
    };
}
