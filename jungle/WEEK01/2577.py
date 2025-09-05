A = int(input())
B = int(input())
C = int(input())

total = str(A * B * C)

# for i in range(1, 10):  <= 이렇게 하면 숫자 0이 나왔을때 개수를 안새
for i in range(10):
    print(total.count(str(i)))
