import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,DropdownMenuSeparator
} from "@radix-ui/react-dropdown-menu";
import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogContent
} from "@radix-ui/react-dialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type SkillType = {
  name: string;
  experience: string;
};

const Skills = () => {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillExp, setNewSkillExp] = useState("");
  const [updatedSkill, setUpdatedSkill] = useState("");
  const [updatedExperience, setUpdatedExperience] = useState("");

  const handleSkillClick = (index: number) => {
    setSelectedSkillIndex(index);
    setIsDialogOpen(true);
  };

  const selectedSkill = selectedSkillIndex !== null ? skills[selectedSkillIndex] : null;

  const handleUpdate = () => {
    if (selectedSkillIndex !== null) {
      const updated = [...skills];
      updated[selectedSkillIndex] = { name: updatedSkill, experience: updatedExperience };
      setSkills(updated);
      setIsUpdateDialogOpen(false);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedSkillIndex !== null) {
      const filtered = skills.filter((_, idx) => idx !== selectedSkillIndex);
      setSkills(filtered);
      setIsDeleteConfirmOpen(false);
      setIsDialogOpen(false);
    }
  };

  const handleAdd = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { name: newSkill.trim(), experience: newSkillExp.trim() }]);
      setNewSkill("");
      setNewSkillExp("");
      setIsAddSkillOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Dropdown for selecting skills */}
     <Card className="h-screen"	>

        <CardHeader >
          <CardTitle>Add Your Skills</CardTitle>
        </CardHeader>
        <CardContent >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-[600px] min-h-[60px] justify-between">
                {selectedSkill?.name || "Select Skill"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="start"
              className="z-50 min-w-[600px] rounded-md border bg-white p-2 shadow-lg"
            >
              <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
              <DropdownMenuItem
                onSelect={() => setIsAddSkillOpen(true)}
                className="text-sm text-center cursor-pointer py-1 hover:bg-blue-50 rounded-md"
              >
                + Add New Skill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {skills.length > 0 && (
        // <Card>
      
          <div className="space-y-2 w-[600px]">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded-md px-4 py-2 mt-5 text-sm"
              >
                <div className="flex gap-2">
                  <div>{skill.name}</div>
                  <div className="text-gray-500">{skill.experience} year</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedSkillIndex(index);
                      setUpdatedSkill(skill.name);
                      setUpdatedExperience(skill.experience);
                      setIsUpdateDialogOpen(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedSkillIndex(index);
                      setIsDeleteConfirmOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        // </Card>
      )}

        </CardContent>
      </Card>

      {/* Skills List Outside Dropdown */}
      
      {/* Add Skill Dialog */}
      <Dialog open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg z-50 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Add New Skill</h2>
              <DialogClose asChild>
                <button>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </DialogClose>
            </div>

            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="rflex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="number"
              placeholder="Experience (Years)"
              value={newSkillExp}
              onChange={(e) => setNewSkillExp(e.target.value)}
              className="rflex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAdd}>Add Skill</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 space-y-4 z-50">
            <h2 className="text-lg font-semibold mb-2">Update Skill</h2>

            <input
              type="text"
              value={updatedSkill}
              onChange={(e) => setUpdatedSkill(e.target.value)}
              className="w-full rflex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="text"
              value={updatedExperience}
              onChange={(e) => setUpdatedExperience(e.target.value)}
              className="w-full rflex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <div className="flex justify-end gap-2">
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/30" />
          <DialogContent className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 space-y-4 z-50">
            <p className="text-sm">
              Are you sure you want to delete <strong>{selectedSkill?.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
              <Button variant="destructive" onClick={handleDelete}>Yes, Delete</Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </motion.div>
  );
};

export default Skills;
