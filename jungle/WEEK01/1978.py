# 주어진 수 N개 중에서 소수가 몇 개인지 찾아서 출력하는 프로그램을 작성하시오.

# 첫 줄에 수의 개수 N이 주어진다. N은 100이하이다. 다음으로 N개의 수가 주어지는데 수는 1,000 이하의 자연수이다.

# 주어진 수들 중 소수의 개수를 출력한다.

# import math
# import sys

# def is_prime():

#     # C = list(map(int, sys.stdin.readline().rstrip(),split())) --> 여러수를 입력받아 리스트로 만들기
#     C = int(sys.stdin.readline().rstrip())
#     N = []
#     for _ in range(C):
#         N.append(int(input()))
#         for i in N:
#             if i < 2:
#                 return False
#         for n in N:
#             for i in range(2, int(math.sqrt(n)+1)):
#                 if n % i == 0:
#                     return False
#             return True
    
# is_prime()

# import math
# import sys

# # 몇개의 정수를 받을것인지 입력받고
# num_case = int(sys.stdin.readline().strip())
# # 정수를 받을 빈 리스트를 만들고
# nums = list(map(int, sys.stdin.readline().strip()))

# # 그만큼의 정수를 입력받기위해 반복문을 만들고
# for _ in range(int(num_case)):
#     #반복문이 한번 수행되면서 num변수에 한개씩 num_case만큼 받고 --> num = nums.append(i)은 그냥 리스트에 값을 추가할 뿐 반환값이 없음으로 num은 그냥 None이 됨
#     # num = nums.append(i)
#     for num in nums :
#         if num <= 2 : 
#          False
#         for num in 

import sys, math

num = int(sys.stdin.readline().strip())
input_nums = list(map(int, sys.stdin.readline().split()))


def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(math.sqrt(n)) + 1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False

    # return [i for i in range(2, num+1) if is_prime[i]] 리스트 컴프리헨션 [표현식 for 변수 in 반복가능한_것], 
    # [i for i in range(10) if i % 2 == 0] 조건 추가가능
    return is_prime
    
prime_flage = sieve(max(input_nums))  # 입력된 숫자 중 가장 큰 수까지 소수판별 리스트를 생성한다
count = 0
for num in input_nums:
    if prime_flage[num]:
        count += 1

print(count)

    




        
        
