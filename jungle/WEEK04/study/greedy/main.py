# 백준 11047번: 동전 0
# 그리디 알고리즘을 사용한 해결

def solve_coin_problem():
    # 입력 받기
    n, k = map(int, input().split())
    coins = []
    for _ in range(n):
        coins.append(int(input()))
    
    # 그리디 알고리즘 적용
    count = 0  # 사용한 동전의 개수
    
    # 가장 큰 동전부터 확인 (역순으로)
    for i in range(n-1, -1, -1):
        if k >= coins[i]:  # 현재 동전을 사용할 수 있는 경우
            # 현재 동전으로 만들 수 있는 최대 개수 계산
            coin_count = k // coins[i]
            count += coin_count
            k -= coins[i] * coin_count
            
            print(f"동전 {coins[i]}원을 {coin_count}개 사용, 남은 금액: {k}원")
            
            # 목표 금액을 모두 만든 경우 종료
            if k == 0:
                break
    
    return count

# 실행 예시를 위한 시뮬레이션
def simulate_example():
    print("=== 백준 11047번 시뮬레이션 ===")
    print("예시: 동전 종류 10개, 목표 금액 4200원")
    print()
    
    # 예시 데이터
    coins = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000]
    k = 4200
    count = 0
    
    print("그리디 알고리즘 적용 과정:")
    print("-" * 40)
    
    for i in range(len(coins)-1, -1, -1):
        if k >= coins[i]:
            coin_count = k // coins[i]
            count += coin_count
            k -= coins[i] * coin_count
            
            print(f"동전 {coins[i]:5d}원을 {coin_count:2d}개 사용 → 남은 금액: {k:4d}원")
            
            if k == 0:
                break
    
    print("-" * 40)
    print(f"총 사용한 동전 개수: {count}개")
    print()
    
    # 시간복잡도 분석
    print("=== 시간복잡도 분석 ===")
    print("• 동전 종류: N개")
    print("• 각 동전마다 나눗셈 연산 1번")
    print("• 시간복잡도: O(N)")
    print("• 공간복잡도: O(1) - 추가 배열 불필요")

# 시뮬레이션 실행
simulate_example()

# 그리디가 최적인 이유 증명
print("\n=== 그리디 알고리즘이 최적인 이유 ===")
print("""
1. 그리디 선택 속성:
   • 가장 큰 동전을 최대한 사용하는 것이 항상 최적
   • 동전이 배수 관계이므로, 큰 동전 1개 = 작은 동전 여러 개
   
2. 최적 부분 구조:
   • K원의 최적해 = 가장 큰 동전 사용 + 나머지 금액의 최적해
   • 부분 문제도 같은 그리디 전략으로 해결 가능

3. 수학적 증명:
   • 동전 Ai+1이 Ai의 배수라면
   • Ai를 여러 개 사용하는 것보다 Ai+1 하나 사용이 항상 유리
""")