/**
 * Calculadora de Preços para Bebidas
 */
class PriceCalculator {
  /**
   * Calcula o preço final com desconto
   * @param {number} price - Preço original
   * @param {number} discountPercentage - Percentual de desconto (0-100)
   * @returns {number} Preço final
   */
  calculateFinalPrice(price, discountPercentage) {
    if (price < 0) {
      throw new Error('O preço não pode ser negativo');
    }

    if (discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('O desconto deve estar entre 0 e 100');
    }

    const discountAmount = (price * discountPercentage) / 100;
    return parseFloat((price - discountAmount).toFixed(2));
  }

  /**
   * Calcula desconto para compras em volume
   * @param {Array} items - Lista de itens
   * @param {number} bulkThreshold - Quantidade mínima para desconto
   * @returns {number} Percentual de desconto
   */
  calculateBulkDiscount(items, bulkThreshold = 10) {
    if (!Array.isArray(items)) {
      throw new Error('Items deve ser um array');
    }

    if (items.length >= bulkThreshold) {
      return 15; // 15% de desconto
    }

    return 0;
  }

  /**
   * Calcula preço com taxa de serviço
   * @param {number} price - Preço base
   * @param {number} serviceRate - Taxa de serviço (0-1)
   * @returns {number} Preço com taxa
   */
  addServiceFee(price, serviceRate = 0.10) {
    if (price < 0) {
      throw new Error('O preço não pode ser negativo');
    }

    if (serviceRate < 0 || serviceRate > 1) {
      throw new Error('A taxa de serviço deve estar entre 0 e 1');
    }

    return parseFloat((price * (1 + serviceRate)).toFixed(2));
  }
}

module.exports = PriceCalculator;
