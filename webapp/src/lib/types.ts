/**
 * 
 */
export type TagType = {
    MVP?: string; // Minimum Viable Product: Represents features or tasks that constitute the minimum set of functionality to deliver core value and gather initial feedback.
    Ready?: string; // Ready for production: Indicates that a task or feature is prepared for development or deployment.
    Beta?: string; // Beta: Signifies features or tasks that are in the beta stage, typically undergoing testing before a full release.
    Enhancement?: string; // Enhancement: Refers to improvements or extensions of existing features or functionalities.
    Security?: string; // Security: Indicates tasks or features related to the security of the system or application.
    Optimization?: string; // Optimization: Refers to efforts to improve performance, memory usage, or other operational aspects of the software.
}

export type ContentType = {
    dev: string; // Name of the creator
    img: string; // Image URL of the creator
    version: string; // Version of the application
    role: string; // Role of the creator
    content: string; // Indicates whether it is a release or something else
    status: string; // Indicates if the change is new or already done
    headline: string; // Headline of the changelog
    textContent: string; // Text content of the changelog
    tags: {[TagType: string]: TagType[keyof TagType];}; // Tags of the changelog
}


/**
 * 
 */
export type Stats = {
    icon: string;
    content: string;
    displayHeader: string;
}[]


/**
 * 
 */
export type TypePointsCriteria = {
    1: number,
    2: number,
    3: number,
    4: number, 
    5: number, 
    6: number, 
    7: number, 
    8: number,
    9: number,
    10: number, 
    11: number, 
    12: number
}[]





export type LeaderboardStats = {
    place: string;
    short: string;
    name: string;
    highsore: string;
    img: string;
}[]




export type GameStats = {
    playername: string,
    pointsPerRound: string,
    totalPoints: string,
    spinning: boolean
}
