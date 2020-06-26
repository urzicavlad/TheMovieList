import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-actor-modal',
  templateUrl: './create-actor-modal.component.html',
})
export class CreateActorModalComponent implements OnInit {

  actorForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<CreateActorModalComponent>,
    private formBuilder: FormBuilder
  ) {
    this.actorForm = this.formBuilder.group({
      name: [''],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const actorTobeSaved = this.actorForm.getRawValue();
    console.log(`Actor to be saved: ${JSON.stringify(actorTobeSaved)}`);
    this.dialogRef.close(actorTobeSaved);
  }

  ngOnInit(): void {
  }


}
