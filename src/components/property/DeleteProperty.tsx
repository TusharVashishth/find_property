"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteProperty({
  deleteCallback,
  loading,
  id,
}: {
  deleteCallback: (id: number) => void;
  loading: boolean;
  id: number;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-foreground">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Property
              </ModalHeader>
              <ModalBody>
                <h1 className="text-2xl font-bold"> Are you sure ?</h1>
                <p>Once you deleted then you can't recover this property.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onClick={() => deleteCallback(id)}
                  isLoading={loading}
                >
                  Yes Delete it
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
