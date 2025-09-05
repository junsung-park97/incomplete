# # 피보나치 - 재귀 + 메모
# # 큰 문제로 시작하여 작은문제로 쪼개기

# memo = {}

# def fib(n):
#     if n in memo:  # 이미 계산했으면
#         return memo[n]  # 저장된 값 반환
    
#     if n <= 1:
#         return n
    
#     memo[n] = fib(n-1) + fib(n-2)  # 계산하고 저장
#     return memo[n]

def fib_with_print(n, memo={}):
    print(f"fib({n}) 호출됨")
    
    #베이스케이스
    if n in memo:
        print(f"  memo에서 발견: {memo[n]}")
        return memo[n]
    
    # 베이스 케이스
    # n <= 1이라는 말은 곧, n == 1일떄 1을 반환하고 n == 0 일떄는 0을 반환한다는 말
    if n <= 1:
        print(f"  기저 조건: {n}")
        return n
    
    print(f"  계산 시작: fib({n-1}) + fib({n-2})")
    result = fib_with_print(n-1, memo) + fib_with_print(n-2, memo)
    
    memo[n] = result  # ← 여기서 딕셔너리에 추가!
    print(f"  memo에 저장: {n} -> {result}")
    print(f"  현재 memo: {memo}")
    
    return result

print("=== fib(4) 호출 ===")
result = fib_with_print(4)
print(f"최종 결과: {result}")

# 피보나치는 제귀쓰면 안됨