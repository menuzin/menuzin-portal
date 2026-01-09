"use client";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container-custom">
        <div className="text-center text-text-muted">
          <p>&copy; {new Date().getFullYear()} Menufy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}