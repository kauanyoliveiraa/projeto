package vidasaudavel.api.controller;

import vidasaudavel.api.model.Medico;
import vidasaudavel.api.repository.MedicoRepository; // IMPORT CORRETO
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medicos")
@CrossOrigin(origins = "*") // Liberar requisições CORS para o front-end
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;  // INJETAR O REPOSITORY CORRETAMENTE

    @GetMapping
    public List<Medico> listarMedicos() {
        return medicoRepository.findAll(); // USAR O OBJETO, NÃO A INTERFACE
    }

    @GetMapping("/{id}")
    public Optional<Medico> buscarMedicoPorId(@PathVariable Long id) {
        return medicoRepository.findById(id);
    }

    @PostMapping
    public Medico adicionarMedico(@RequestBody Medico medico) {
        return medicoRepository.save(medico);
    }

    @PutMapping("/{id}")
    public Medico atualizarMedico(@PathVariable Long id, @RequestBody Medico medicoAtualizado) {
        return medicoRepository.findById(id)
                .map(medico -> {
                    medico.setNome(medicoAtualizado.getNome());
                    medico.setCrn(medicoAtualizado.getCrn());
                    medico.setEspecialidade(medicoAtualizado.getEspecialidade());
                    medico.setSexo(medicoAtualizado.getSexo());
                    medico.setTelefone(medicoAtualizado.getTelefone());
                    medico.setEmail(medicoAtualizado.getEmail());
                    return medicoRepository.save(medico);
                })
                .orElseGet(() -> {
                    medicoAtualizado.setId(id);
                    return medicoRepository.save(medicoAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarMedico(@PathVariable Long id) {
        medicoRepository.deleteById(id);
    }
}
