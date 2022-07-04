export default class NotificationMessage {
  
  static instance = null;
  timerId = 0;

  constructor(
    message = '', 
    { 
      duration = 0, 
      type = '',
    } = {}
  ) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    if (NotificationMessage.instance) {
      NotificationMessage.instance.remove();
    }
    this.makeElement();
    NotificationMessage.instance = this;
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
         <div class="timer"></div>
         <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
            ${this.message}
            </div>
         </div>
      </div>
    `;
  }

  makeElement() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
    document.body.append(this.element);
  }

  show(elem = document.body) {
    elem.append(this.element);
    this.element.style.display = 'block';
    this.timer = this.duration;
  }

  set timer(time) {
    this.timerId = setTimeout(this.remove.bind(this), time);
  }
  get timer() {
    return this.timerId;
  }

  remove() {
    this.element.remove();
    clearTimeout(this.timer);
    NotificationMessage.instance = null;
  }

  destroy() {
    this.remove();
  }
}
