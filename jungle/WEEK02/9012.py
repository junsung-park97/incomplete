import sys

input = sys.stdin.readline


n = int(input())
#n번의 케이스만큼 반복
for _ in range(n):
    stack = []
    pare = input().rstrip()
    is_vps = True
    # pare의 문자열 개수만큼 반복
    for p in pare:
        if p == '(':
            stack.append(p)
        elif p == ')' :
            if len(stack) != 0 :
                stack.pop()
            else :
                is_vps = False
                break

    if not is_vps or stack:
        print('NO')
    else :
        print('YES')

