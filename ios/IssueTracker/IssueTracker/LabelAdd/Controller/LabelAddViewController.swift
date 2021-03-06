//
//  LabelAddViewController.swift
//  IssueTracker
//
//  Created by Byoung-Hwi Yoon on 2020/11/08.
//

import UIKit

protocol LabelDataDelegate: class {
    func labelDidAdd(label: Label)
    func labelDidUpdate(label: Label, indexPath: IndexPath)
}

class LabelAddViewController: UIViewController {
    static var identifier: String {
        String(describing: Self.self)
    }
    
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    @IBOutlet weak var colorTextField: UITextField!
    @IBOutlet weak var colorBox: ColorBox!
    @IBOutlet weak var containerView: UIView!
    
    weak var delegate: LabelDataDelegate?
    var colorTextFieldManager = ColorTextFieldManager()
    var indexPath: IndexPath?
    var labelData: Label?
   
    override func viewDidLoad() {
        super.viewDidLoad()
        addTapToDismissKeyBoard()
        addKeyboardObserver()
        colorTextField.delegate = self
        if let data = labelData {
            prepareForUpdate(data: data)
        }
    }
    
    private func reset() {
        titleTextField.text = nil
        descriptionTextField.text = nil
        colorTextField.text = nil
    }
    
    override func keyboardWillShow(keyboardHeight: CGFloat) {
        let topOfkeyboard = view.frame.height - keyboardHeight
        let bottomOfView = containerView.frame.origin.y + containerView.frame.size.height
        
        if bottomOfView > topOfkeyboard {
            containerView.frame.origin.y += topOfkeyboard - bottomOfView
        }
    }
    
    override func keyboardWillHide(notification: NSNotification) {
        containerView.frame.origin.y = view.center.y - containerView.frame.height/2 - 30
    }
    
    func prepareForUpdate(data: Label) {
        titleTextField.text = data.labelTitle
        descriptionTextField.text = data.labelDescription
        colorTextField.text = String(data.labelColor.dropFirst())
        colorBox.configure(with: colorTextField.text ?? "")
    }
    
    @IBAction func closeButtonDidTouch(_ sender: UIButton) {
        dismiss(animated: true)
    }
    
    @IBAction func resetButtonDidTouch(_ sender: UIButton) {
        reset()
        colorTextField.text = "FFFFFF"
        colorBox.configure(with: colorTextField.text ?? "")
    }
    
    @IBAction func saveButtonDidTouch(_ sender: UIButton) {
        let label = Label(labelNo: labelData?.labelNo ?? 0, labelTitle: titleTextField.text ?? "", labelColor: "#" + (colorTextField.text ?? ""), labelDescription: descriptionTextField.text ?? "")

        if let indexPath = indexPath {
            delegate?.labelDidUpdate(label: label, indexPath: indexPath)
        } else {
            delegate?.labelDidAdd(label: label)
        }
        
        dismiss(animated: true)
    }
    
    @IBAction func randomButtonTouched(_ sender: UIButton) {
        colorTextField.text = colorTextFieldManager.randomColor()
        colorBox.configure(with: colorTextField.text ?? "")
    }
    
    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        if touches.first?.view == view {
            dismiss(animated: true)
        }
    }
}

extension LabelAddViewController: UITextFieldDelegate {
    
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        colorTextFieldManager.isValidate(text: textField.text, input: string)
    }
    
    func textFieldDidChangeSelection(_ textField: UITextField) {
        colorBox.configure(with: textField.text ?? "")
    }
}
