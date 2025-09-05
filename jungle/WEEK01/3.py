A = int(input())
B = int(input())


temp1 = int(B % 10) * A
temp10 = int((B/10)%10) * A
temp100 = int((B/100)%10) * A
print(temp1)
print(temp10)
print(temp100)
print(A * B)

exit()

