import React from 'react';
export default function AsideComponent() {
    return(<aside>
        <small>Angemeldet als</small>
        <big>
            <span class="name">Hans Huber</span>,
            <span class="class">10c</span>
        </big>
        <button onclick="alert('Not Working!')">Abmelden</button>
    </aside>)
}

