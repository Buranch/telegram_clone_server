m,k = map(int, input().strip().split(" "))
arr = [int(x) for x in input().strip().split(" ")]
#arr = [7,2,4,6,5,9,12,11]
#arr = [1,2,3,4,5]
arr.sort()
print(arr)

i = 0
radio = 0
j = 0
lastTrasmitter = 0
while i < len(arr)+1 :
    print("----------------Start-------------------")
    print("i value ",i, " which is ",arr[i])
    j = i + 1
    while  j < len(arr) and arr[j] - arr[i] <= k:
        print("Goes through first ",j," which is ",arr[j])
        j+=1
    print("Transmitter settled in ",arr[j-1])
    if lastTrasmitter == arr[j-1]:
        break
    else:
         radio+=1
         print("Trasmitter found ",radio)
    lastTrasmitter = arr[j-1]
#    print("j is ",j," i is ",i)
    while j < len(arr) and i < len(arr) and arr[i] < arr[j-1]+k:
        if(arr[i] - arr[j-1]):
            break
        print("Goes through second ",arr[i])
        print("arr[i] ",arr[i]," arr[j]+k ",arr[j-1]+k, "for arr[j] ",arr[j])
        i+=1
    if(i+1 == len(arr) or ):
        i = i
    else:
        i+=1
    print("-------------End of while------------------")
print(radio)
