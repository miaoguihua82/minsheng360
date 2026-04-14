// 首页JS

document.addEventListener('DOMContentLoaded', () => {
  // 数字动画
  setTimeout(() => {
    animateCount(document.getElementById('totalQuestions'), '12845');
    animateCount(document.getElementById('solvedQuestions'), '11203');
    animateCount(document.getElementById('deptCount'), '128');
  }, 400);
});
