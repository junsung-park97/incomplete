import sys

input = sys.stdin.readline

n = int(input().rstrip())
arr = list(map(int, input().rstrip().split()))
arr.sort()

left = 0
right = n-1

#answer가 0에 가까워지면 질 수록 정답에 가까워진다
answer = abs(arr[left] + arr[right]) # answer = abs(arr[left] + arr[right]) -> abs(-99 + 98) == abs(-1) == 1
final = [arr[left], arr[right]] # -> 가장 0에 가까운 두 수를 저장하는 공간


while left < right:
    left_val = arr[left]
    right_val = arr[right]

    sum = left_val + right_val
  
    if abs(sum) < answer:
        answer = abs(sum)
        final = [left_val, right_val]
        if answer == 0:
          break
    if sum < 0:
        left += 1
    else:
        right -= 1

print(final[0], final[1])
