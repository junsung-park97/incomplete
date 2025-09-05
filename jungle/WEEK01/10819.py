
# 조합을 사용해서 하려했는데 배열의 순서에 따라 값이 변함으로 조합이 아닌 순열을 써야힘.....
# import sys
# from itertools import combinations

# input = sys.stdin.readline

# T = int(input())
# nums = []
# sum_lis = []

# for _ in range(T):
#     num = int(input())
#     nums.append(num)


#     for 조합별변수 in combination(리스트, 조합할 개수)
#     for case in combinations(nums, T):
#         가능한 모든 경우의수를 리스트업해야 그중에 가장 큰 수를 찾을 수 있잖아?
#         sum_lis.append(sum(case))
#     print(max(sum_lis))

#     제너레이 표현식
#     list.nums에서 T개로 배열했을 때 가능한 모든경우의수 case를 반복하면서 그 값을 case에 넣고 그 case중에 가장 큰 값을 찾는다
#     max_sum = max(sum(case) for case in combinations(nums, T))
#     print(max_sum)


from itertools import permutations
import sys

input = sys.stdin.readline

T = int(input())
nums = list(map(int, input().split()))

max_val = 0
for case in permutations(nums):
    total = 0
    # 이게 이해가 안가네...
    for i in range(T - 1):
        total += abs(case[i] - case[i + 1])
    # 처음 반복에서는 max_val이 0이니까 무조건 total이 높지만 두번째반복부터는 둘중 무엇이 높을지 모르니까 둘중 더 높은걸 골라줘야함, 그리고 그냥 숫자에다가 max()를 쓰면 에러
    max_val = max(max_val, total)

print(max_val)




    