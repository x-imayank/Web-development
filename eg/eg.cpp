#include <bits/stdc++.h>
using namespace std;

int main()
{
    int arr[50], size, num, plc, value;
    cout << "Enter the size of arr:";
    cin >> size;

    cout << "Enter the values of array \n";
    for (int i = 1; i <= size; i++)
    {
        cout << i << " position: ";
        cin >> arr[i];
    }

    cout << "Enter the value which you wants to enter: ";
    cin >> value;

    cout << "Enter the position where the element you wants to enter: ";
    cin >> plc;

    for (int k = size; k >= plc; k--)
    {
        arr[k + 1] = arr[k];
        arr[plc] = value;
    }

    cout << "The elements are: ";
    for (int i = 1; i <= size + 1; i++)
    {
        cout << arr[i] << "\n";
        return 0;
    }
}