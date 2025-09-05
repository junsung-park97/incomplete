import sys
sys.setrecursionlimit(10**6)  # 재귀 깊이 늘려줌

def hanoi(n, start, mid, end):
    if n == 1:
        moves.append(f"{start} {end}")
        return
    hanoi(n - 1, start, end, mid)
    moves.append(f"{start} {end}")
    hanoi(n - 1, mid, start, end)

N = int(sys.stdin.readline())
print(2**N - 1)

if N <= 20:
    moves = []
    hanoi(N, 1, 2, 3)
    print('\n'.join(moves))