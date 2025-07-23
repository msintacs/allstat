function Sidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <aside
        className="absolute left-0 top-[88px] h-full w-80 bg-indigo-950 text-white shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="p-4">
          <ul>
            <li>카테고리 1</li>
            <li>카테고리 2</li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
