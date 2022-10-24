module.exports = [
  {
    type: 'service',
    name: 'NolCoordinateService.add',
    properties: [
      {
        name: 'coordinate',
        type: 'Coordinate',
        description: 'Coordinate.'
      },
      {
        name: 'fractionDigits',
        type: 'number',
        default: '0',
        description: 'The number of digits to include after the decimal point. Default is ```0```.'
      }
    ]
  }
];