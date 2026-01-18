/**
 * Calculate estimated reading time for a blog post
 * @param content - The markdown/text content of the post
 * @param wordsPerMinute - Average reading speed (default: 200 wpm)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
    // Remove markdown syntax and extra whitespace
    const text = content
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]*`/g, '') // Remove inline code
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to text
        .replace(/[#*_~>\-]/g, '') // Remove markdown symbols
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);

    return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @param lang - Language for formatting ('en' | 'es')
 * @param short - Use short format (default: false)
 * @returns Formatted string (e.g., "5 min read" or "5 min")
 */
export function formatReadingTime(minutes: number, lang: string = 'en', short: boolean = false): string {
    if (short) {
        return `${minutes} min`;
    }
    if (lang === 'es') {
        return `${minutes} min`;
    }
    return `${minutes} min read`;
}

/**
 * Format date for display
 * @param date - Date to format
 * @param lang - Language for formatting ('en' | 'es')
 * @returns Formatted date string
 */
export function formatDate(date: Date, lang: string = 'en'): string {
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
