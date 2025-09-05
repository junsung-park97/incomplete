n = int(input())

# 0인 경우 특별 처리
if n == 0:
    print(0)
else:
    result = ""
    
    while n != 0:
        if n % 2 == 0:  # 짝수인 경우
            result += "0"
            n = n // (-2)  # -2로 나눈 몫
        else:  # 홀수인 경우
            result += "1"
            n = (n - 1) // (-2)  # 나머지 1을 빼고 -2로 나눈 몫
    
    # 결과는 거꾸로 만들어졌으므로 뒤집기
    print(result[::-1])