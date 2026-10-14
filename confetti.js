// Spaced out confetti physics loader utility
(function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var activeConfetti = [];

    window.confetti = function(options) {
        options = options || {};
        var particleCount = options.particleCount || 50;
        var angle = options.angle || 90;
        var spread = options.spread || 45;
        var origin = options.origin || { x: 0.5, y: 0.5 };

        // Append canvas layer if it doesn't exist
        if (!document.getElementById('confetti-canvas')) {
            canvas.id = 'confetti-canvas';
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '999';
            document.body.appendChild(canvas);
            
            window.addEventListener('resize', function() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            });
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var radAngle = angle * (Math.PI / 180);
        var radSpread = spread * (Math.PI / 180);

        for (var i = 0; i < particleCount; i++) {
            var pAngle = radAngle + (Math.random() - 0.5) * radSpread;
            var pVelocity = 15 + Math.random() * 15;

            activeConfetti.push({
                x: origin.x * canvas.width,
                y: origin.y * canvas.height,
                vx: Math.cos(pAngle) * pVelocity,
                vy: -Math.sin(pAngle) * pVelocity,
                color: 'hsl(' + (Math.random() * 360) + ', 100%, 50%)',
                size: 5 + Math.random() * 5,
                opacity: 1
            });
        }
    };

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i = activeConfetti.length - 1; i >= 0; i--) {
            var p = activeConfetti[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.5; // Custom downward gravity engine simulation
            p.opacity -= 0.015; // Slow clean fade away effect rule

            if (p.opacity <= 0) {
                activeConfetti.splice(i, 1);
                continue;
            }

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
})();
