export class CalculatorBrain {
  constructor(
    private readonly height: number,
    private readonly weight: number,
  ) {}

  calculateBMI(): string {
    const heightInMeters = this.height / 100;
    return (this.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }

  getResult(): 'UNDERWEIGHT' | 'NORMAL' | 'OVERWEIGHT' {
    const bmi = Number(this.calculateBMI());
    if (bmi >= 25) return 'OVERWEIGHT';
    if (bmi >= 18.5) return 'NORMAL';
    return 'UNDERWEIGHT';
  }

  getInterpretation(): string {
    switch (this.getResult()) {
      case 'OVERWEIGHT':
        return 'Bạn có chỉ số BMI cao hơn mức khuyến nghị. Hãy duy trì chế độ ăn và vận động cân bằng.';
      case 'NORMAL':
        return 'Tuyệt vời! Chỉ số BMI của bạn đang ở mức khỏe mạnh.';
      default:
        return 'Bạn có chỉ số BMI thấp hơn mức khuyến nghị. Hãy tham khảo ý kiến chuyên gia để có chế độ phù hợp.';
    }
  }
}
