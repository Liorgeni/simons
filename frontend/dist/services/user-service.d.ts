export declare const userSerive: {
    saveScore: typeof saveScore;
    getScores: typeof getScores;
};
export declare function saveScore(score: number): Promise<void>;
export declare function getScores(): Promise<any>;
