import * as http from 'http';
import * as os from 'os';

export class SiteModule {
    private server: http.Server | null = null;
    private port: number = 3000;
    private htmlContent: string = '';
    private isRunning: boolean = false;
    private pageName: string = 'TypesSriptKrack Site';
    private textMin: string = 'Welcome';

    setPort(port: number): void {
        this.port = port;
    }

    parseHtmlBlock(htmlBlock: string): string {
        let content = htmlBlock.trim();
        
        if (content.startsWith('[') && content.endsWith(']')) {
            content = content.slice(1, -1).trim();
        }

        const pageNameMatch = content.match(/<pagename>\s*([^<]+)\s*<\/pagename>/);
        if (pageNameMatch) {
            this.pageName = pageNameMatch[1].trim();
        }

        const textMinMatch = content.match(/<textmin>\s*([^<]+)\s*<\/textmin>/);
        if (textMinMatch) {
            this.textMin = textMinMatch[1].trim();
        }

        return this.generateHtml();
    }

    generateHtml(): string {
        return `<html>
<head>
    <title>${this.pageName}</title>
</head>
<body>
    <h1>${this.pageName}</h1>
    <p>${this.textMin}</p>
</body>
</html>`;
    }

    setHtmlContent(content: string): void {
        this.htmlContent = content;
    }

    initSite(): void {
        // silent
    }

    startServer(): void {
        if (this.isRunning) {
            return;
        }

        this.server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(this.htmlContent || this.generateHtml());
        });

        this.server.listen(this.port, () => {
            this.isRunning = true;
        });
    }

    getFullUrl(): string {
        const interfaces = os.networkInterfaces();
        let localIP = '127.0.0.1';

        for (const interfaceName in interfaces) {
            const networkInterface = interfaces[interfaceName];
            if (networkInterface) {
                for (const net of networkInterface) {
                    if (net.family === 'IPv4' && !net.internal) {
                        localIP = net.address;
                        break;
                    }
                }
            }
        }

        return `http://${localIP}:${this.port}`;
    }

    stopServer(): void {
        if (this.server && this.isRunning) {
            this.server.close();
            this.isRunning = false;
        }
    }

    isSiteCommand(command: string): boolean {
        return command.includes('site.') || 
               command.includes('lite.html.crack.made') ||
               command.startsWith('html =');
    }
} 