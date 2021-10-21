/**
 * JWT Test
 * secret key
 */

export const jwtSecret = process.env.JWT_SECRET || 'test';
console.log(`env test: ${process.env.JWT_SECRET}`);
