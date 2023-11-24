import numpy as np

def step(x):
    return 1 if x >= 0 else 0

def perceptron(x1, x2, w1, w2):
    sum = x1 * w1 + x2 * w2
    return step(sum)

andx = [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]

def treinar(andx, w1, w2, epocas):
    for epoca in range(epocas):
        for entrada in andx:
            x1 = entrada[0]
            x2 = entrada[1]
            esperado = entrada[2]

            predicao = perceptron(x1, x2, w1, w2)
            erro = esperado - predicao

            w1 = w1 + erro * x1
            w2 = w2 + erro * x2

    return w1, w2

andx = [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 1, 1]]
w1 = 0
w2 = 0
epocas = 1000

w1, w2 = treinar(andx, w1, w2, epocas)

for entrada in andx:
    x1 = entrada[0]
    x2 = entrada[1]
    esperado = entrada[2]

    predicao = perceptron(x1, x2, w1, w2)

    print("x1:", x1, ", x2:", x2, ", esperado:", esperado, ", predicao:", predicao)
