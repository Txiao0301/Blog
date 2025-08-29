function jumpTo(path: string): void {
    window.location.href = '/#/' + path;
}

function jumpToWithParams(path: string, params: Record<string, string>): void {
    const queryString = new URLSearchParams(params).toString();
    window.location.href = '/#/' + path + '?' + queryString;
}

function jumpToOnNewTab(path: string): void {
    window.open('/#/' + path, '_blank');
}

function jumpToOnNewTabWithParams(path: string, params: Record<string, string>): void {
    const queryString = new URLSearchParams(params).toString();
    window.open('/#/' + path + '/' + queryString, '_blank');
}

function jumpToOnNewTabWithHash(path: string, hash: string): void {
    window.open('/#/' + path + '/' + hash, '_blank');
}

export { jumpTo, jumpToWithParams, jumpToOnNewTab, jumpToOnNewTabWithParams ,jumpToOnNewTabWithHash};