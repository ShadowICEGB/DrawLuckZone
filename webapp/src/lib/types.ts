/**
 * 
 */
export type TagType = {
    MVP?: string;
    Ready?: string;
    Beta?: string;
    Enhancement?: string;
    Security?: string;
    Optimization?: string;
}
export type ContentType = {
    dev: string;
    img: string;
    version: string;
    role: string;
    content: string;
    status: string;
    headline: string;
    textContent: string;
    tags: {[TagType: string]: TagType[keyof TagType];};
}
