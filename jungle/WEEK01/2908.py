a,b = map(int, input().split())

reversed_a = int(str(a)[::-1])
reversed_b = int(str(b)[::-1])

if reversed_a > reversed_b:
    print(reversed_a)
else :
    print(reversed_b)

# 시퀀스[start:end:step]
# start = 시작인덱스
# end = 끝 인덱스
# step = 증가/감소 인덱스 (음수면 거꾸로)(양수면 해당 인덱스만 할당)