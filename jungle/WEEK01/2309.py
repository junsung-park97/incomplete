# 왕비를 피해 일곱 난쟁이들과 함께 평화롭게 생활하고 있던 백설공주에게 위기가 찾아왔다. 일과를 마치고 돌아온 난쟁이가 일곱 명이 아닌 아홉 명이었던 것이다.

# 아홉 명의 난쟁이는 모두 자신이 "백설 공주와 일곱 난쟁이"의 주인공이라고 주장했다. 뛰어난 수학적 직관력을 가지고 있던 백설공주는, 다행스럽게도 일곱 난쟁이의 키의 합이 100이 됨을 기억해 냈다.

# 아홉 난쟁이의 키가 주어졌을 때, 백설공주를 도와 일곱 난쟁이를 찾는 프로그램을 작성하시오.

#완전탐색, 리스트, 조합활용

#탐색의 종류 : 완전탐색, 이진탐색, DFS(깊이 우선 탐색), BFS(너비 우선 탐색), 해시탐색, 순차탐색, 트리탐색, 에이스타탐색, 다익스트라탐색

# 완전탐색이란 : 가능한 모든 경우릐 수를 전부 다 시도해서 정답을 찾는 알고리즘
#   - 단순하고 구현하기 쉽지만 경우의 수가 많아지면 느려지는 단점이 있음
#
# 완전탐색에 속하는 탐색법 : 브루트 포스트, 비트마스크, 백트레킹, 순열탐색, 재귀함수, 비선형탐색
# 비선형탐색에 속하는 탐색법 : DFS(깊이 우선 탐색), BFS(너비 우선 탐색)

# itertools -> 효율적인 반복자 생성 및 조작기능을 제공하는 파이썬 표준 라이브러리
# combinations함수 -> 주어진iterable(리스트, 문자열)에서 순서를 고려하지 않고 r개를 뽑는 모든 조합을 생성하는 함수
# 변환 타입은 iterator
# 중복없이 조합을 생성
# 가능한 모든 조합을 메모리 부담없이 한 번에 하나씩 생성(메모리에 상당히 효율적
# 반환값이 list가 아니고, iterable이므로 필요하다면 list()로 변환이 가능함.

# EX)
# data -> 리스트, 문자열 등 조합을 만들 대상
# r -> 뽑을 개수
# from itertools import combinations

# data = [1, 2, 3, 4]
# comb = combinations(data, 2)

# for c in comb:
#     print(c)

#리스트이름.append(추가할_값)


import sys
from itertools import combinations

input = sys.stdin.readline
dwarfs = []

for dwarf in range(9):
    dwarf = int(input().strip())
    dwarfs.append(dwarf)
    # dwa = combinations(dwarfs, 7)

for com in combinations(dwarfs, 7) :
    if sum(com) == 100 :
        # real_com = list(com)
        # real_com.sort()
        # combination된 결과값은 튜플이여서 sort()("리스트의 메서드")를 사용 할 수 없는데 대신 sorted()"파이썬의 내장함수"는 튜플도 사용가능하다
        real_com = sorted(com, reverse = False)

        # 출력형식이 한줄씩 출력됨 그러므로 print()는 형식에 맞지않음
        # print(real_com)
        
        # for i in range(int(real_com))
        # real_com은 리스트인데 정수로 변환 할 수 없고, range안에는 정수만 들어가야함
        for i in real_com:
            print(i)  
        # break에 대해 복습   
        break   
        
    
        
