class MathModule {
    
    isMathExpression(expression: string): boolean {
        return /^[\d\s\+\-\*\/\(\)\w]+$/.test(expression);
    }

    evaluateMath(expression: string, variables: Map<string, number>): number {
        expression = expression.replace(/\s+/g, '');
        
        // Обработка переменных в скобках (ans) -> значение ans
        expression = expression.replace(/\((\w+)\)/g, (match, varName) => {
            if (variables.has(varName)) {
                return variables.get(varName)!.toString();
            }
            return '0';
        });
        
        for (const [varName, value] of variables) {
            expression = expression.replace(new RegExp(`\\b${varName}\\b`, 'g'), value.toString());
        }

        expression = expression.replace(/(\d+)\s*\+\s*(\d+)/g, (_, a, b) => (parseFloat(a) + parseFloat(b)).toString());
        expression = expression.replace(/(\d+)\s*-\s*(\d+)/g, (_, a, b) => (parseFloat(a) - parseFloat(b)).toString());
        expression = expression.replace(/(\d+)\s*\*\s*(\d+)/g, (_, a, b) => (parseFloat(a) * parseFloat(b)).toString());
        expression = expression.replace(/(\d+)\s*\/\s*(\d+)/g, (_, a, b) => (parseFloat(a) / parseFloat(b)).toString());

        try {
            return this.parseSimpleMath(expression);
        } catch {
            throw new Error(`Не могу вычислить: ${expression}`);
        }
    }

    // Математические функции
    sqrt(value: number): number {
        return Math.sqrt(value);
    }

    pow(base: number, exponent: number): number {
        return Math.pow(base, exponent);
    }

    sin(degrees: number): number {
        return Math.sin(degrees * Math.PI / 180);
    }

    cos(degrees: number): number {
        return Math.cos(degrees * Math.PI / 180);
    }

    tan(degrees: number): number {
        return Math.tan(degrees * Math.PI / 180);
    }

    abs(value: number): number {
        return Math.abs(value);
    }

    round(value: number): number {
        return Math.round(value);
    }

    floor(value: number): number {
        return Math.floor(value);
    }

    ceil(value: number): number {
        return Math.ceil(value);
    }

    min(...values: number[]): number {
        return Math.min(...values);
    }

    max(...values: number[]): number {
        return Math.max(...values);
    }

    random(): number {
        return Math.random();
    }

    private parseSimpleMath(expr: string): number {
        expr = expr.replace(/\s+/g, '');
        
        if (/^\d+(\.\d+)?$/.test(expr)) {
            return parseFloat(expr);
        }

        if (expr.includes('+')) {
            const parts = expr.split('+');
            return parts.reduce((sum, part) => sum + this.parseSimpleMath(part), 0);
        }

        if (expr.includes('-')) {
            const parts = expr.split('-');
            let result = this.parseSimpleMath(parts[0]);
            for (let i = 1; i < parts.length; i++) {
                result -= this.parseSimpleMath(parts[i]);
            }
            return result;
        }

        if (expr.includes('*')) {
            const parts = expr.split('*');
            return parts.reduce((product, part) => product * this.parseSimpleMath(part), 1);
        }

        if (expr.includes('/')) {
            const parts = expr.split('/');
            let result = this.parseSimpleMath(parts[0]);
            for (let i = 1; i < parts.length; i++) {
                const divisor = this.parseSimpleMath(parts[i]);
                if (divisor === 0) throw new Error('Деление на ноль!');
                result /= divisor;
            }
            return result;
        }

        return parseFloat(expr);
    }
}

module.exports = { MathModule }; 