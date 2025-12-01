const PriceCalculator = require('../../src/services/PriceCalculator');

describe('PriceCalculator - Testes Unitários', () => {
  let calculator;

  // Executado antes de cada teste
  beforeEach(() => {
    calculator = new PriceCalculator();
  });

  describe('calculateFinalPrice()', () => {
    test('deve retornar o preço original quando desconto é 0%', () => {
      const result = calculator.calculateFinalPrice(100, 0);
      expect(result).toBe(100);
    });

    test('deve calcular corretamente desconto de 10%', () => {
      const result = calculator.calculateFinalPrice(100, 10);
      expect(result).toBe(90);
    });

    test('deve calcular corretamente desconto de 25%', () => {
      const result = calculator.calculateFinalPrice(80, 25);
      expect(result).toBe(60);
    });

    test('deve retornar 0 quando desconto é 100%', () => {
      const result = calculator.calculateFinalPrice(100, 100);
      expect(result).toBe(0);
    });

    test('deve arredondar para 2 casas decimais', () => {
      const result = calculator.calculateFinalPrice(99.99, 33.33);
      expect(result).toBe(66.66);
    });

    test('deve lançar erro quando preço é negativo', () => {
      expect(() => {
        calculator.calculateFinalPrice(-50, 10);
      }).toThrow('O preço não pode ser negativo');
    });

    test('deve lançar erro quando desconto é maior que 100%', () => {
      expect(() => {
        calculator.calculateFinalPrice(100, 150);
      }).toThrow('O desconto deve estar entre 0 e 100');
    });

    test('deve lançar erro quando desconto é negativo', () => {
      expect(() => {
        calculator.calculateFinalPrice(100, -10);
      }).toThrow('O desconto deve estar entre 0 e 100');
    });
  });

  describe('calculateBulkDiscount()', () => {
    test('deve retornar 15% de desconto para 10 ou mais itens', () => {
      const items = new Array(10).fill({ id: 1, name: 'Cerveja' });
      const result = calculator.calculateBulkDiscount(items);
      expect(result).toBe(15);
    });

    test('deve retornar 15% de desconto para exatamente 10 itens', () => {
      const items = new Array(10).fill({ id: 1 });
      const result = calculator.calculateBulkDiscount(items);
      expect(result).toBe(15);
    });

    test('deve retornar 0% de desconto para menos de 10 itens', () => {
      const items = new Array(5).fill({ id: 1 });
      const result = calculator.calculateBulkDiscount(items);
      expect(result).toBe(0);
    });

    test('deve retornar 0% de desconto para array vazio', () => {
      const items = [];
      const result = calculator.calculateBulkDiscount(items);
      expect(result).toBe(0);
    });

    test('deve aceitar threshold customizado', () => {
      const items = new Array(5).fill({ id: 1 });
      const result = calculator.calculateBulkDiscount(items, 5);
      expect(result).toBe(15);
    });

    test('deve lançar erro quando items não é um array', () => {
      expect(() => {
        calculator.calculateBulkDiscount('not an array');
      }).toThrow('Items deve ser um array');
    });
  });

  describe('addServiceFee()', () => {
    test('deve adicionar 10% de taxa de serviço por padrão', () => {
      const result = calculator.addServiceFee(100);
      expect(result).toBe(110);
    });

    test('deve adicionar taxa de serviço customizada', () => {
      const result = calculator.addServiceFee(100, 0.15);
      expect(result).toBe(115);
    });

    test('deve calcular corretamente com taxa de 0%', () => {
      const result = calculator.addServiceFee(100, 0);
      expect(result).toBe(100);
    });

    test('deve arredondar para 2 casas decimais', () => {
      const result = calculator.addServiceFee(33.33, 0.10);
      expect(result).toBe(36.66);
    });

    test('deve lançar erro quando preço é negativo', () => {
      expect(() => {
        calculator.addServiceFee(-50);
      }).toThrow('O preço não pode ser negativo');
    });

    test('deve lançar erro quando taxa é negativa', () => {
      expect(() => {
        calculator.addServiceFee(100, -0.1);
      }).toThrow('A taxa de serviço deve estar entre 0 e 1');
    });

    test('deve lançar erro quando taxa é maior que 1', () => {
      expect(() => {
        calculator.addServiceFee(100, 1.5);
      }).toThrow('A taxa de serviço deve estar entre 0 e 1');
    });
  });
});
