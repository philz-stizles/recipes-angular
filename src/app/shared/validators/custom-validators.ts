import { FormControl } from '@angular/forms';

export class CustomValidators {
  static synchronousValidator = (
    formControl: FormControl
  ): { [key: string]: boolean } | null => {
    if (formControl.value === '') {
      return { '': true };
    }
    return null;
  };

  static emailExists = (formControl: FormControl) =>
    new Promise<{ [key: string]: boolean } | null>((resolve, reject) => {
      fetch('')
        .then((response) => response.json())
        .then((data) => {
           if (data.status) {
             resolve({ emailExists: true });
           }
           resolve(null);
        });
    });
}
