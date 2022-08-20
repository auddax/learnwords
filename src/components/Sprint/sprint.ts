import { ISprint, ISprintStart } from '../../types/interfaces';

class Sprint implements ISprint {
  start: ISprintStart;

  constructor() {
    this.start = new SprintStart();
  }

  render() {
    const main = document.querySelector('.page-content');
    if (main) if (main) main.innerHTML = this.start.render();
  }
}

export default Sprint;
