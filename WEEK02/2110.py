import sys

input = sys.stdin.readline

N, wifi = map(int, input().strip().split())

house_lis = [int(input()) for _ in range(N)]
house_lis.sort()

start = 1 #공유기와 공유기의 최소거리 => start
end = house_lis[-1] - house_lis[0] # 이해가 좀 필요함 나중에 뭐든 고칠 수 있을 것 같음
result = 0 # 나중에 결과값을 담을 변수


# 공유기와 공유기 사이의 거리도 하나의 연속된 배열이므로 그걸 이용해서 찾자
# 초기거리와 더이상 길어지면 안되는 거리를 설정한다
# 초기거리와 끝거리를 이용해서 중간값을 도출해낸다
# 중간값의 거리마다 공유기를 설치한다 ex) 중간값이 3이면 1,4,7,11 등등
# 그렇게 했을 때 주어진 공유기의 개수(C)만큼 들어가면 그 값을 출력하고
# 주어진 공유기의 개수보다 작으면 start값을 mid + 1로 설정하여 다시 호출한다.
# 주어진 공유기의 개수보다 크면 end 값을 mid - 1로 설정하여 다시 호출한다.
while start <= end :
    mid = (start + end) // 2
    # print(mid)
    value = house_lis[0] #이게 왜 필요한 지 모르겠음 => 가장 최근에 설치한 공유기의 위치
    count = 1 #이게 왜 필요한 지 모르겠음 => 시점까지 설치된 공유기의 개수
    for i in range(1, N):
        # 이게 뭘 말하는건지 모르겠음 => 가장최근에 설치된 공유기의 위치 + 공유기와 공유기 사이의 거리 = 다음에 위치하는 공유기의 위치
        # f house_lis[i] >= value + mid -> value + mid가 house_lis보다 작다면 house_lis는 이미 위치가 내가 다음에 수행할 위치에 가있다는거 아니야?
        if house_lis[i] >= value + mid : 
            # print(mid)
            value = house_lis[i] # 이게 무엇을 의미하는 지 모르겠음 => 위에서 구한 다음에 위치하는 공유기의 위치를 최신 공유기의 위치로 초기화
            count += 1 # 카운트를 늘려서 얻고자 하는 것을 모르겠음 => 카운트를 늘림으로서 지금까지 내가 몇개의 공유기를 설치했는지 알 수 있음
    if count >= wifi :
        start = mid + 1 # 답을 도출했는데 왜 다시 재귀를 돌리는지 모르겠음 => 이건 진짜 모르겠음
        result = mid
    else :
        end = mid - 1

print(result)


    



    
