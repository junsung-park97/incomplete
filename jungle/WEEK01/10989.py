
# 퀵 정렬
# import sys
# sys.setrecursionlimit(10**7)

# #퀵정렬정의
# def quick_sort(arr):
#     if len(arr) <= 1:
#         return arr
#     pivot = arr[0]
#     left = [x for x in arr[:1] if x <= pivot]
#     right = [x for x in arr[:1] if x > pivot]

#     return quick_sort(left) + [pivot] + quick_sort(right)

# N = int(sys.stdin.readline())
# nums = [int(sys.stdin.readline()) for _ in range(N)]

# sort_nums = quick_sort(nums)
# for num in sort_nums:
#     print(num)

#카운트 정렬
import sys

input = sys.stdin.readline

N = int(input())
count = [0] * 10001

for _ in range(N) :
    num = int(input())
    count[num] += 1

for i in range(1, 10001) :
    if count[i] > 0 :
        for _ in range(count[i]) :
            print(i)

