casosPositivosGetProgramas= [
    {
        key: 'PROGRAMAS SIN DECIMAL',
        programas: 12035,
        expected: '12k'
    },
    {
        key: 'PROGRAMAS DECIMAL SIN REDONDEO',
        programas: 15935,
        expected: '15.9k'
    },
    {
        key: 'PROGRAMAS DECIMAL REDONDEO 1',
        programas: 2350,
        expected: '2.4k'
    },
    {
        key: 'PROGRAMAS DECIMAL SIN REDONDEO 2',
        programas: 11499,
        expected: '11.5k'
    },
]

module.exports = {casosPositivosGetProgramas}