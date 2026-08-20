import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { MoreHorizontal, Download, Trash, FileEdit, Settings, CheckCircle2, AlertTriangle, Info, AlertCircle } from "lucide-react"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-12 lg:p-16 flex justify-center">
      <div className="w-full max-w-4xl space-y-12">
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Joinha DS: Phase 3</h1>
          <p className="text-muted-foreground mt-2">
            React Components Implementation (Shadcn UI + Radix + Tailwind v4)
          </p>
        </header>

        {/* Buttons Grid */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Buttons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="lg">Large</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="destructive">Destructive</Button>
              <Button variant="destructive" disabled>Disabled</Button>
            </div>
          </div>
        </section>

        {/* Forms Row */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Forms & Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-(--tc-form-stack-gap) surface-card surface-base shadow-sm p-(--tc-card-p) surface-highlight border-gradient-subtle">
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Standard Input</label>
                <Input placeholder="Enter your text here..." />
              </div>
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Error State</label>
                <Input placeholder="Invalid input" error />
                <p className="text-xs text-destructive">This field is required.</p>
              </div>
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Numeric (tabular-nums)</label>
                <Input type="number" placeholder="0.00" className="type-data-mono" />
              </div>
            </div>

            <div className="flex flex-col gap-(--tc-form-stack-gap) surface-card surface-panel elevation-2 p-(--tc-card-p) surface-highlight border-gradient-subtle">
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Select</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Inline Form Action</label>
                <div className="flex items-center gap-(--tc-floating-item-gap)">
                  <Input placeholder="Email address" />
                  <Button variant="primary">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dropdown Menu */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Dropdown Menu (Actions)</h2>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Options <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileEdit className="w-4 h-4" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4" /> Download Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  <Trash className="w-4 h-4" /> Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Overlays & Notifications */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Overlays & Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="type-ui-dense font-semibold text-muted-foreground">Modals & Dialogs</h3>
              <div className="flex gap-4">
                {/* Standard Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <Settings className="w-4 h-4" /> Configurações
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Configurações do Perfil</DialogTitle>
                      <DialogDescription>
                        Atualize suas informações. Clique em salvar quando terminar.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-(--tc-form-stack-gap) py-4">
                      <div className="flex flex-col gap-(--tc-form-label-gap)">
                        <label className="type-ui-dense font-semibold">Nome de exibição</label>
                        <Input defaultValue="Jefferson Domingos" />
                      </div>
                      <div className="flex flex-col gap-(--tc-form-label-gap)">
                        <label className="type-ui-dense font-semibold">Email</label>
                        <Input defaultValue="jefferson@example.com" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="primary">Salvar alterações</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash className="w-4 h-4" /> Excluir Projeto
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o seu
                        projeto e removerá os dados de nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Excluir permanentemente</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="type-ui-dense font-semibold text-muted-foreground">Toasts (Sonner)</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => toast.success("Projeto salvo com sucesso!")}
                  className="justify-start"
                >
                  <CheckCircle2 className="w-4 h-4 text-success" /> Success
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.error("Falha ao conectar com o servidor.")}
                  className="justify-start"
                >
                  <AlertCircle className="w-4 h-4 text-destructive" /> Error
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.warning("Sua assinatura expira em 3 dias.")}
                  className="justify-start"
                >
                  <AlertTriangle className="w-4 h-4 text-warning" /> Warning
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.info("Nova atualização disponível.")}
                  className="justify-start"
                >
                  <Info className="w-4 h-4 text-info" /> Info
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  )
}

export default App
