import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Wrench, X } from "lucide-react";
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
          <DropdownMenu.Root >
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" className="min-w-[600px] min-h-[60px] justify-between">
                {selectedSkill?.name || "Select Skill"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              side="bottom"
              align="start"
              className="z-50 min-w-[600px] rounded-md border bg-white p-2 shadow-lg"
            >
              <DropdownMenu.Separator className="my-1 border-t border-gray-200" />
              <DropdownMenu.Item
                onSelect={() => setIsAddSkillOpen(true)}
                className="text-sm text-center cursor-pointer py-1 hover:bg-blue-50 rounded-md"
              >
                + Add New Skill
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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
      <Dialog.Root open={isAddSkillOpen} onOpenChange={setIsAddSkillOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg z-50 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Add New Skill</h2>
              <Dialog.Close asChild>
                <button>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </Dialog.Close>
            </div>

            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Experience (Years)"
              value={newSkillExp}
              onChange={(e) => setNewSkillExp(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button onClick={handleAdd}>Add Skill</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Update Dialog */}
      <Dialog.Root open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 space-y-4 z-50">
            <h2 className="text-lg font-semibold mb-2">Update Skill</h2>

            <input
              type="text"
              value={updatedSkill}
              onChange={(e) => setUpdatedSkill(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              value={updatedExperience}
              onChange={(e) => setUpdatedExperience(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />

            <div className="flex justify-end gap-2">
              <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Delete Dialog */}
      <Dialog.Root open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 space-y-4 z-50">
            <p className="text-sm">
              Are you sure you want to delete <strong>{selectedSkill?.name}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild><Button variant="outline">Cancel</Button></Dialog.Close>
              <Button variant="destructive" onClick={handleDelete}>Yes, Delete</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
};

export default Skills;
