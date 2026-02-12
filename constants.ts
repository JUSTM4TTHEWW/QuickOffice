
import { ModuleData, GearItem } from './types';

export const MODULES: ModuleData[] = [
  {
    id: 'word',
    title: 'Word / Docs',
    icon: 'FileText',
    color: 'blue',
    description: 'Master document creation, formatting, and collaboration features.',
    questions: [
      { id: 1, text: 'Which tool is used to make text bold?', options: ['Italic', 'Underline', 'Bold', 'Highlight'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 2, text: 'Which tool changes text size?', options: ['Font Color', 'Font Size', 'Styles', 'Zoom'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 3, text: 'Which tool aligns text to the center of the page?', options: ['Line Spacing', 'Indent', 'Center Align', 'Justify'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 4, text: 'Which tool is used to insert a picture?', options: ['Home', 'Review', 'Insert', 'View'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 5, text: 'Which tool checks spelling mistakes?', options: ['Word Count', 'Spell Check', 'Translate', 'Comments'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 6, text: 'Which feature allows multiple people to edit the document at the same time?', options: ['Track Changes', 'Sharing', 'Version History', 'Comments'], correctAnswer: 1, difficulty: 'Medium', category: 'Features' },
      { id: 7, text: 'What feature records all edits made by collaborators?', options: ['Spell Check', 'Track Changes', 'Compare Documents', 'Thesaurus'], correctAnswer: 1, difficulty: 'Hard', category: 'Features' },
      { id: 8, text: 'Which feature helps apply consistent formatting to headings?', options: ['Font Tools', 'Styles', 'Themes', 'Templates'], correctAnswer: 1, difficulty: 'Medium', category: 'Features' },
      { id: 9, text: 'Which feature can restore an older version of a document?', options: ['Undo', 'Backup', 'Version History', 'Track Changes'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
      { id: 10, text: 'Which feature automatically creates a Table of Contents?', options: ['Headers', 'Page Breaks', 'Styles', 'Columns'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
    ]
  },
  {
    id: 'excel',
    title: 'Excel / Sheets',
    icon: 'Table',
    color: 'green',
    description: 'Learn data analysis, formulas, and advanced spreadsheet tools.',
    questions: [
      { id: 1, text: 'What symbol is used to start a formula?', options: ['+', '-', '=', '*'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 2, text: 'Which tool is used to add numbers quickly?', options: ['Sort', 'Filter', 'AutoSum', 'Chart'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 3, text: 'Which tool allows you to copy a pattern automatically?', options: ['Fill Color', 'AutoFill', 'Format Painter', 'Paste'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 4, text: 'Which tool changes how numbers are displayed (currency, percentage)?', options: ['Cell Borders', 'Number Format', 'Conditional Formatting', 'Data Validation'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 5, text: 'Which tool displays data as a graph?', options: ['Table', 'Pivot', 'Chart', 'Filter'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 6, text: 'Which feature sorts data based on specific conditions?', options: ['Sort', 'Filter', 'Freeze Panes', 'Protect Sheet'], correctAnswer: 1, difficulty: 'Medium', category: 'Features' },
      { id: 7, text: 'Which feature highlights cells based on rules or values?', options: ['Charts', 'Filters', 'Conditional Formatting', 'AutoFill'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
      { id: 8, text: 'Which feature restricts what users can enter in a cell?', options: ['Protect Workbook', 'Filter', 'Data Validation', 'Conditional Formatting'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
      { id: 9, text: 'Which feature summarizes large amounts of data quickly?', options: ['Table', 'Pivot Table', 'Chart', 'Sort'], correctAnswer: 1, difficulty: 'Hard', category: 'Features' },
      { id: 10, text: 'Which feature prevents others from editing the spreadsheet structure?', options: ['Filter', 'Data Validation', 'Protect Sheet', 'Freeze Panes'], correctAnswer: 2, difficulty: 'Medium', category: 'Features' },
    ]
  },
  {
    id: 'powerpoint',
    title: 'PowerPoint / Slides',
    icon: 'Presentation',
    color: 'orange',
    description: 'Create engaging presentations with slides, animations, and more.',
    questions: [
      { id: 1, text: 'Which tool is used to add a new slide?', options: ['Design', 'Insert', 'Review', 'View'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 2, text: 'Which tool changes the layout of a slide?', options: ['Theme', 'Layout', 'Transition', 'Animation'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 3, text: 'Which tool inserts images or videos?', options: ['Home', 'Design', 'Insert', 'Slide Show'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 4, text: 'Which tool changes the background design of slides?', options: ['Layout', 'Theme', 'Animation', 'Notes'], correctAnswer: 1, difficulty: 'Easy', category: 'Tools' },
      { id: 5, text: 'Which tool starts the slide presentation?', options: ['Edit', 'Review', 'Slide Show', 'View'], correctAnswer: 2, difficulty: 'Easy', category: 'Tools' },
      { id: 6, text: 'Which feature controls how one slide changes to the next?', options: ['Animation', 'Transition', 'Layout', 'Theme'], correctAnswer: 1, difficulty: 'Medium', category: 'Features' },
      { id: 7, text: 'Which feature adds movement to text or objects?', options: ['Transition', 'Slide Master', 'Animation', 'Theme'], correctAnswer: 2, difficulty: 'Medium', category: 'Features' },
      { id: 8, text: 'Which feature allows you to edit all slides at once?', options: ['Normal View', 'Slide Sorter', 'Slide Master', 'Presenter View'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
      { id: 9, text: 'Which feature shows speaker notes during a presentation?', options: ['Reading View', 'Slide Sorter', 'Presenter View', 'Outline View'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
      { id: 10, text: 'Which feature helps maintain consistent formatting across slides?', options: ['Layout', 'Theme', 'Slide Master', 'Transition'], correctAnswer: 2, difficulty: 'Hard', category: 'Features' },
    ]
  }
];

export const OFFICE_PALETTE = [
  { name: 'Word Blue', class: 'bg-blue-600', hex: '#2b579a' },
  { name: 'Excel Green', class: 'bg-emerald-600', hex: '#217346' },
  { name: 'PPT Orange', class: 'bg-orange-600', hex: '#b7472a' },
  { name: 'Outlook Blue', class: 'bg-sky-600', hex: '#0078d4' },
  { name: 'Teams Purple', class: 'bg-indigo-600', hex: '#6264a7' },
  { name: 'OneNote Purple', class: 'bg-purple-600', hex: '#80397b' },
  { name: 'Office Red', class: 'bg-rose-600', hex: '#d83b01' },
];

export const INITIAL_PROGRESS = {
  xp: 0,
  level: 1,
  avatarBase: 'User', // Refers to Lucide icon name or image path
  avatarColor: 'bg-indigo-600',
  selectedGear: { head: 'teams_headset', weapon: 'word_pen', shield: 'excel_grid', cape: null },
  unlockedGear: ['teams_headset', 'word_pen', 'excel_grid'],
  word: { preTestScore: null, postTestScore: null, isCompleted: false },
  excel: { preTestScore: null, postTestScore: null, isCompleted: false },
  powerpoint: { preTestScore: null, postTestScore: null, isCompleted: false },
};

export const GEAR_ITEMS: GearItem[] = [
  { id: 'teams_headset', name: 'Teams Linker', type: 'head', icon: 'Headset', description: 'Crystal clear communication with the squad.', unlockedBy: 'default' },
  { id: 'focus_visor', name: 'Focus Visor', type: 'head', icon: 'Eye', description: 'Blocks out all distractions for maximum document output.', unlockedBy: 'q1' },
  { id: 'word_pen', name: 'Word Wand', type: 'weapon', icon: 'PenTool', description: 'A pen mightier than any spreadsheet.', unlockedBy: 'default' },
  { id: 'excel_axe', name: 'Pivot Axe', type: 'weapon', icon: 'Axe', description: 'Cuts through raw data like a hot knife through butter.', unlockedBy: 'excel' },
  { id: 'excel_grid', name: 'Grid Shield', type: 'shield', icon: 'Grid', description: 'Protects against calculation errors and syntax bugs.', unlockedBy: 'default' },
  { id: 'ppt_cape', name: 'Slide Shroud', type: 'cape', icon: 'Wind', description: 'Adds dramatic flair to any transition effect.', unlockedBy: 'powerpoint' },
  { id: 'outlook_cloak', name: 'Inbox Mantle', type: 'cape', icon: 'Mail', description: 'Grants immunity to unread email notifications.', unlockedBy: 'word' },
  { id: 'office_belt', name: 'Utility Ribbon', type: 'shield', icon: 'Command', description: 'Keeps all your shortcuts within reach.', unlockedBy: 'q2' },
];

export const INITIAL_QUESTS = [
  { id: 'q1', title: 'First Steps', description: 'Complete your first pre-test in any module.', reward: 'Badge: Explorer', isCompleted: false, xpReward: 500 },
  { id: 'q2', title: 'Word Wizard', description: 'Score 100% on the Word post-test.', reward: 'Badge: Document Expert', isCompleted: false, xpReward: 500 },
  { id: 'q3', title: 'Excel Master', description: 'Finish the Excel learning module.', reward: 'Badge: Spreadsheet Pro', isCompleted: false, xpReward: 500 },
  { id: 'q4', title: 'Slide Star', description: 'Complete the PowerPoint post-test.', reward: 'Badge: Presenter Extraordinaire', isCompleted: false, xpReward: 500 },
];
