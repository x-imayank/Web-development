#include <bits/stdc++.h>
using namespace std;

void bubblesort(vector<int> &arr)
{
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i)
    {
        for (int j = 0; j < n - i - 1; ++j)
        {
            if (arr[j] > arr[j + 1])
            {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main()
{
    vector<int> arr = {4, 3, 5, 2, 6, 8};
    bubblesort(arr);
    for (int i : arr)
    {
        cout << i << endl;
    }
}