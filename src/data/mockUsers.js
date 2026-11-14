export const DEMO_ACCOUNTS = [
    {
        role: 'Guest',
        label: 'Guest Explorer',
        username: 'guest_visitor',
        name: 'Guest Visitor',
        email: 'guest@brainbites.local',
        avatarInitial: 'G',
        description: 'Browse puzzles without saved streaks or ranking.'
    },
    {
        role: 'Player',
        label: 'Player',
        username: 'player_puzzler',
        name: 'player player',
        email: 'player@brainnites.local',
        avatarInitial: 'P',
        description: 'Solve puzzles, track scores, climb leaderboards.'
    },
    {
        role: 'Creator',
        label: 'Creator',
        username: 'Creator',
        name: 'Creator Creator',
        email: 'creator@brainbites.local',
        avatarInitial: 'C',
        description: 'Design new word games and submit for publishing.'
    },
    {
        role: 'Administrator',
        label: 'Admin',
        username: 'admin',
        name: 'Admin admin',
        email: 'admin@brainbites.local',
        avatarIniAial: 'A',
        description: 'Moderate puzzles, manage user roles, review reports.'
    }
];

// Initial default state for visitors before any login action occurs
export const INITIAL_USER = {
    isLoggedIn: false,
    role: 'Guest',
    username: 'guest',
    name: 'Guest Player',
    email: '',
    avatarInitial: '?'
};