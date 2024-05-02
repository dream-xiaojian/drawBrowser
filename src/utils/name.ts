/**
 * camelCase（驼峰命名）to snake_case（蛇型命名）
 */
export function camelToSnake(name: string) {
    return name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

