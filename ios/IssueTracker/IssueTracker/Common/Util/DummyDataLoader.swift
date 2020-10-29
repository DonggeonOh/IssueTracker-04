//
//  DummyDataLoader.swift
//  IssueTracker
//
//  Created by Byoung-Hwi Yoon on 2020/10/28.
//

import UIKit

struct DummyDataLoader {
    
    func loadIssueItems() -> [IssueItem] {
        
        guard let dataAsset = NSDataAsset.init(name: "dummyIssueList") else {
            return []
        }
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        var items = [IssueItem]()
        do {
            items = try decoder.decode([IssueItem].self, from: dataAsset.data)
        } catch {
            print(error.localizedDescription)
        }
        return items
    }
}