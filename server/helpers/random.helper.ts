export function generateRandomId(length: number = 7): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const BEAUTIFUL_COLORS = [
    '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B',
    '#10B981', '#06B6D4', '#3B82F6', '#8B5A2B', '#6D28D9',
    '#DC2626', '#059669', '#0891B2', '#7C3AED', '#DB2777',
    '#EA580C', '#65A30D', '#0D9488', '#2563EB', '#7C2D12'
];

export function getRandomColor(): string {
    return BEAUTIFUL_COLORS[Math.floor(Math.random() * BEAUTIFUL_COLORS.length)];
}
